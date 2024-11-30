import Card from "components/Card";
import styles from "./status.module.css";

import React from "react";
import useSWR from "swr";

const fetchApi = async (key) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
};

const StatusPage = () => {
  return (
    <div className={`${styles.backgound} ${styles.center}`}>
      <div className={styles.container}>
        <h1 className={styles.titleStatus}>Status</h1>
        <UpdatedAt />
      </div>
    </div>
  );
};

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi);

  let updatedText = "Carregando...";
  let database;

  if (!isLoading && data) {
    updatedText = new Date(data.updated_at).toLocaleString("pt-BR");
    database = data.dependencies.database;
  }

  return (
    <div className={styles.infoContainer}>
      <Card cardTitle={"Última atualização"} cardValue={updatedText} />
      <Card
        cardTitle={"Máximo de conexões"}
        cardValue={!isLoading ? database?.max_connections : updatedText}
      />
      <Card
        cardTitle={"Conexões abertas"}
        cardValue={!isLoading ? database?.opened_connections : updatedText}
      />
      <Card
        cardTitle={"Versão do PostgreSQL"}
        cardValue={!isLoading ? database?.version : updatedText}
      />
    </div>
  );
}

export default StatusPage;
