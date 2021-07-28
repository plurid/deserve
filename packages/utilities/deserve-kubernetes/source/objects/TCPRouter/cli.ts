// #region imports
    // #region libraries
    import os from 'os';
    import fs from 'fs';
    import path from 'path';
    import childProcess from 'child_process';
    import {
        exec,
        execFile,
        spawn,
        fork,
    } from 'child_process';

    import forever from 'forever';
    import argv from 'minimist';
    // #endregion libraries
// #endregion imports



// #region module
var isWindows = os.platform() == 'win32';

var balancerFilePath = path.resolve(__dirname, '../index.js');
var logFileName = path.resolve(process.cwd(), 'loadbalancer.out');



var command = argv._[0];
var commandRawArgs = process.argv.slice(3);
var arg1 = argv._[1];



var MAX_RESTARTS = 300;

var parsePackageFile = function (moduleDir: any) {
    var packageFile = moduleDir + '/package.json';
    try {
        if (fs.existsSync(packageFile)) {
        return JSON.parse(fs.readFileSync(packageFile, {encoding: 'utf8'}));
        }
    } catch (e) {}

    return {};
};

var logMessage = function (message: any) {
    if (typeof message != 'string') {
        message = message.toString();
    }
    process.stdout.write(message);
    fs.appendFileSync(logFileName, message);
};

var errorMessage = function (message: any) {
    console.log('\033[0;31m[Error]\033[0m ' + message);
}

var successMessage = function (message: any) {
    console.log('\033[0;32m[Success]\033[0m ' + message);
}

var warningMessage = function (message: any) {
    console.log('\033[0;33m[Warning]\033[0m ' + message);
}

var showCorrectUsage = function () {
    console.log('Usage: loadbalancer [options] [command]\n');
    console.log('Options:');
    console.log("  -v            Get the version of the current loadbalancer installation");
    console.log('  --help        Get info on how to use this command');
    console.log('  --config      The path to the config file to use');
    console.log();
    console.log('Commands:');
    console.log('  start         Launch a load balancer');
    console.log('  list          Show a list of all active load balancers');
    console.log('  stop [index]  Stop a load balancer - Will stop all active balancers if index is not specified');
}

var prompt = function (message: any, callback: any) {
    process.stdout.write(message + ' ');
    process.stdin.on('data', function inputHandler(text) {
        process.stdin.removeListener('data', inputHandler);
        callback(text)
    });
}

var promptConfirm = function (message: any, callback: any) {
    prompt(message, function (data: any) {
        data = data.toLowerCase().replace(/[\r\n]/g, '');
        callback(data == 'y' || data == 'yes');
    });
}

if (argv.help) {
    showCorrectUsage();
    process.exit();
}

if (argv.v) {
    var scDir = __dirname + '/..';
    var scPkg = parsePackageFile(scDir);
    console.log('v' + scPkg.version);
    process.exit();
}

var balancerUid = 'loadbalancer';

var getBalancerIndices = function (callback: any) {
    forever.list(false, function (err: any, children: any) {
        children = children || [];
        var balancers = [];
        var child;
        for (var i = 0; i < children.length; i++) {
        child = children[i];
        if (child.uid == balancerUid) {
            balancers.push(i);
        }
        }
        callback(err, balancers);
    });
};

var killBalancer = function (index: any, callback: any) {
    forever.list(false, function (err: any, children: any) {
        if (err) {
        callback && callback('Failed to stop loadbalancer daemon at index ' + index + ' - ' + err);
        } else {
        var proc;
        if (children) {
            proc = children[index];
        }
        if (proc) {
            var pid = proc.pid;

            forever.stop(index);

            var maxShutDownFailures = 20;
            var shutDownFailures = 0;
            var shutDownInterval = 500;

            var exitWhenComplete = function () {
            forever.list(false, function (err: any, children: any) {
                if (err) {
                callback && callback('Failed to stop loadbalancer daemon at index ' + index + ' - ' + err);
                } else if (++shutDownFailures > maxShutDownFailures) {
                callback && callback('Failed to stop loadbalancer daemon');
                } else {
                var pidIsStillActive = false;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                    if (children[i].pid == pid) {
                        pidIsStillActive = true;
                        break;
                    }
                    }
                }
                if (pidIsStillActive) {
                    setTimeout(exitWhenComplete, shutDownInterval);
                } else {
                    callback && callback();
                }
                }
            });
            }

            setTimeout(exitWhenComplete, shutDownInterval);
        } else {
            callback && callback('There was no loadbalancer daemon at index ' + index);
        }
        }
    });
};

var killExistingBalancers = function (callback: any) {
    getBalancerIndices(function (err: any, balancers: any) {
        if (err) {
        callback && callback('Failed to stop loadbalancer daemons - ' + err);
        } else {
        for (var i = 0; i < balancers.length; i++) {
            forever.stop(balancers[i]);
        }
        var maxShutDownFailures = 20;
        var shutDownFailures = 0;
        var shutDownInterval = 500;

        var exitWhenComplete = function () {
            // Only terminate current daemon when all balancers
            // have been killed.
            getBalancerIndices(function (err: any, activeBalancers: any) {
            if (err) {
                callback && callback('Failed to stop loadbalancer daemon - ' + err);
            } else if (++shutDownFailures > maxShutDownFailures) {
                callback && callback('Failed to stop loadbalancer daemon');
            } else {
                if (activeBalancers.length) {
                setTimeout(exitWhenComplete, shutDownInterval);
                } else {
                callback && callback();
                }
            }
            });
        }

        setTimeout(exitWhenComplete, shutDownInterval);
        }
    });
};

var startBalancer = function () {
    var child = forever.startDaemon(balancerFilePath, {
        uid: balancerUid,
        max: MAX_RESTARTS,
        logFile: logFileName,
        outFile: logFileName,
        errFile: logFileName,
        args: commandRawArgs
    });
    forever.startServer(child);
    successMessage('Started loadbalancer - Logging to ' + logFileName);
};

if (command == 'start') {
    getBalancerIndices(function (err: any, balancers: any) {
        if (err) {
        errorMessage(err);
        } else {
        // Windows behaviour is unstable when spawning multiple load balancer
        // processes so do not allow it.
        if (isWindows) {
            if (balancers.length) {
            errorMessage('loadbalancer daemon is already running');
            } else {
            startBalancer();
            }
        } else {
            startBalancer();
        }
        }
        process.exit();
    });

} else if (command == 'list') {
    forever.list(false, function (err: any, processes: any) {
        if (processes) {
        for (var i = 0; i < processes.length; i++) {
            console.log('Index: ' + i + ', PID: ' + processes[i].pid);
        }
        }
        process.exit();
    });
} else if (command == 'stop') {
    var loadBalancerIndex = commandRawArgs[0];
    if (loadBalancerIndex != null) {
        killBalancer(loadBalancerIndex, function (err: any) {
        if (err) {
            errorMessage(err);
        } else {
            successMessage('Stopped loadbalancer at index ' + loadBalancerIndex);
        }
        process.exit();
        });
    } else {
        killExistingBalancers(function (err: any) {
        if (err) {
            errorMessage(err);
        } else {
            successMessage('Stopped loadbalancers');
        }
        process.exit();
        });
    }
} else {
    errorMessage("'" + command + "' is not a valid loadbalancer command");
    showCorrectUsage();
    process.exit();
}
// #endregion module
