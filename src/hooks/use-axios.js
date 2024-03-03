import { useEffect, useRef, useState } from "react";

export default function useAxios(configRequest) {
  const { axiosInstance, method, url, otherConfigs = {} } = configRequest;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    const effectRun = useRef(false) // 3 criar ref, me permite se estou na primeira pu segunda vez do useEffect. sem effectRun da erro mesmo carregando os dados. o useEffect roda duas vezes causando o erro 



  useEffect(() => {


    // 1 instanciando um controller; com o controller posso cancelar as requests e não ficar sempre sendo executada 
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...otherConfigs,
          signal: controller.signal
        });
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if(effectRun.current) fetchData();


    //2 função de cleanup evitando vazamento de dados
    return () => {
        controller.abort()
        effectRun.current = true
    }

  }, []);

  return [data, loading, error];
}
