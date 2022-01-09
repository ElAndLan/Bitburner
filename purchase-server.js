/** @param {NS} ns **/
export async function main(ns) {
	// Variable to hold the size of the server you want to buy
	let serverSize = 16

	// Iterator for the while loop
	let i = ns.getPurchasedServers();
	// Cost of the server size you want to automate buying
	let purchasedServerCost = ns.getPurchasedServerCost(serverSize);

	while (i.length < ns.getPurchasedServerLimit()) {
		if (ns.getServerMoneyAvailable("home") > purchasedServerCost) {
			let hostName = ns.purchaseServer(`${serverSize}gb-server ` + i.length, serverSize)
			await ns.scp("worms.ns", hostName);
			await ns.scp("hackservers.ns", hostName);
			ns.exec("worms.ns -t 6 phantasy silver-helix omega-net iron-gym zer0", hostName);
			++i;
		} else {
			ns.alert(`You cannot afford any more servers. Script is ending`);
			return
		}
		
		ns.sleep(1000);
	}

	if (i.length === ns.getPurchasedServerLimit()) ns.alert("You are at your limit of servers!");
}
