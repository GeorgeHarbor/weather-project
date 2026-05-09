import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"

function App() {

  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 10, lon: 25 })
  })

  return (
    <>{JSON.stringify(data)}</>
  )
}


export default App


// styling Tailwind
// data fetching - TanStack Quer cky (React query)
