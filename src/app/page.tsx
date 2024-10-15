'use client'

import Image from "next/image";
import styles from "./page.module.css";
import logo from "./assets/image.png";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export default function Home() {
  const correctData: {matricula: string, codigo: string} = {
    matricula: "19340104",
    codigo: "338788"
  }

  const [matricula, setMatricula] = useState("");
  const [codigo, setCodigo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMatricula = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMatricula(event.target.value);
  }, [])

  const handleCodigo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCodigo(event.target.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseElement = document.querySelector("#response");

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (!responseElement) return;

      if ((matricula === correctData.matricula) && (codigo === correctData.codigo)) {
        responseElement.innerHTML = "<p>Aluno: Rodrigo Fernandes Bernal</p><p>Matrícula: 19340104</p><p>CPF: 418.201.978-40</p><p>Curso: CFM - CERTIFICATE IN FINANCIAL MANAGEMENT</p>";
      } else { 
        responseElement.innerHTML = "<p>Os dados informados não conferem com nenhum documento emitido pelo Insper.</p><p>Verifique se os dados foram informados corretamente e tente novamente.</p>";
      }
    }, 4000)
  }, [matricula, codigo, correctData.matricula, correctData.codigo])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image className={styles.logo} src={logo} alt="Insper logo" width="120" height="42"/ >
      </header>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Verificação de Autenticidade</h1>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Matrícula</label>
            <input className={styles.input} type="text" value={matricula} onInput={handleMatricula}/>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Código de confirmação</label>
            <input className={styles.input} type="text" value={codigo} onInput={handleCodigo}/>
          </div>

          {!isLoading && (
            <button type="submit" className={styles.button}>Validar</button>
          )}

          {isLoading && (
            <button type="submit" className={styles.loadingButton}>Validar</button>
          )}

          
          <div id="response" className={styles.response}></div>
        </form>
      </div>

      <footer className={styles.footer}>
        <address className={styles.address}>Rua Quatá, 300 - Vila Olímpia - São Paulo/SP - Brasil | CEP: 04546-042 | Tel.: (11) 4504-2400</address>
      </footer>
    </div>
  );
}
