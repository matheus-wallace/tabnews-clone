import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databseVersionResult = await database.query("SHOW server_version;");
  const databseVersionValue = databseVersionResult.rows[0].server_version;
  const AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
  const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
  const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

  const maxConnection = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnection.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databseVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
        key: { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_KEY },
      },
    },
  });
}

export default status;
