import griddb from './griddb.js';
import store from './griddbClient.js';

// Helper function to create or get a reusable container
export async function getOrCreateContainer(containerName, columnInfoList, rowKey = true) {
	try {
		var conInfo = new griddb.ContainerInfo({
			'name': containerName,
			'columnInfoList': columnInfoList,
			'type': griddb.ContainerType.COLLECTION,
			'rowKey': rowKey
		});

		await store.dropContainer(containerName).catch(() => console.log("Container doesn't exist. Creating new one..."));
		let container = await store.putContainer(conInfo, false);
		return container;
	} catch (err) {
		console.error("Error creating container:", err.message);
		throw err;
	}
}

// Function to insert data into the container
export async function insertData(container, rowData) {
	try {
		container.setAutoCommit(false);
		await container.put(rowData);
		await container.commit();
		console.log('Data committed successfully.');
	} catch (err) {
		console.error("Error inserting data:", err.message);
		throw err;
	}
}

// Function to query data
export async function queryData(container, queryStr = "select *") {
	try {
		let query = container.query(queryStr);
		let rs = await query.fetch();
		while (rs.hasNext()) {
			console.log(rs.next());
		}
		await container.commit();
	} catch (err) {
		console.error("Error querying data:", err.message);
		throw err;
	}
}
