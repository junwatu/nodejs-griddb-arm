import griddb from "./db/griddb.js";
import {
  getOrCreateContainer,
  insertData,
  queryData,
} from "./db/griddbOperations.js";

(async () => {
  try {
    const containerName = "species";

    const columnInfoList = [
      ["id", griddb.Type.INTEGER],
      ["name", griddb.Type.STRING],
      ["age", griddb.Type.DOUBLE],
    ];

    /**
    const columnInfoList = [
      ["name", griddb.Type.STRING],
      ["status", griddb.Type.BOOL],
      ["count", griddb.Type.LONG],
      ["lob", griddb.Type.BLOB],
    ];
    */

    let container = await getOrCreateContainer(containerName, columnInfoList);

    const rowData1 = [1, "Bobcat", 100];
    await insertData(container, rowData1);

    const rowData2 = [2, "Tiger", 5];
    await insertData(container, rowData2);

    await queryData(container);
  } catch (err) {
    console.error("Error in main flow:", err.message);
  }
})();
