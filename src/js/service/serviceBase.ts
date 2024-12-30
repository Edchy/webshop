
export default async function fetchData(url: string) {
  
    const res = await fetch(url);  
    return await res.json()
   
}