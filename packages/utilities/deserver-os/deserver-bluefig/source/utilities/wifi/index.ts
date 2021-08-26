// #region imports
    // #region libraries
    import wifi from 'node-wifi';
    // #endregion libraries
// #endregion imports



// #region module
export const getWifiNetworks = async () => {
    try {
        const wifiNetworks = await new Promise<any[]>(
            (resolve, reject) => {
                wifi.init({
                    iface: null,
                });

                wifi.scan((
                    error: any,
                    networks: any,
                ) => {
                    if (error) {
                        console.log(error);
                        reject();
                    } else {
                        resolve(networks);
                    }
                });
            },
        );

        return wifiNetworks;
    } catch (error) {
        return;
    }
}


export const getWifiList = async () => {
    try {
        const wifiNetworks = await getWifiNetworks();
        if (!wifiNetworks) {
            return;
        }

        const wifiList = wifiNetworks.map((wifiNetwork: any) => {
            return {
                name: wifiNetwork.ssid,
            };
        });

        return wifiList;
    } catch (error) {
        return;
    }
}


export const connectToWifi = async (
    ssid: string,
    password: string,
) => {
    const wifiNetworks = await getWifiNetworks();
    if (!wifiNetworks) {
        return false;
    }

    try {
        const wifiNetwork = wifiNetworks.find((network: any) => network.ssid === ssid);
        if (!wifiNetwork) {
            return false;
        }

        const connected = await new Promise<boolean>(
            (resolve, reject) => {
                wifi.init({
                    iface: null,
                });

                wifi.connect(
                    {
                        ssid,
                        password,
                    },
                    (error: any) => {
                        if (error) {
                            console.log(error);
                            reject();
                        }
                        console.log('Connected to wifi', ssid);
                        resolve(true);
                    },
                );
            },
        );


        return connected;
    } catch (error) {
        return false;
    }
}


export const getCurrentWifi = async () => {
    try {
        const connections = await new Promise<any[]>(
            (resolve, reject) => {
                wifi.init({
                    iface: null,
                });

                wifi.getCurrentConnections(
                    (
                        error: any,
                        currentConnections: any[],
                    ) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(currentConnections);
                        }
                    },
                );
            },
        );

        return connections[0];
    } catch (error) {
        return;
    }
}
// #endregion module
