export default async function fetchData(url: string): Promise<any> {
  try {
    const res = await fetch(url);
    return await res.json()
  } catch(err) {
    console.log('error:', err);
    
  }

}