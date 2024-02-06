import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../api"
import { Root } from "@/typescript/common.all.interface"
import { endpoints } from "../api/endpoints.config"
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

// ISR
export const marketFunc = async () => {
  const dta = await axiosInstance.get<Root>(
    endpoints.fetchData.market
  )
  // console.log('rate', dta);
  return dta?.data?.data
}

export async function getStaticProps() {
  const market = await marketFunc()
  return { 
    props: { 
      market
     },
     revalidate: 10
   }
}

const index = (props: any) => {
  const { isPending, data: markets } = useQuery({
    queryKey: ['rateL'],
    queryFn: marketFunc,
    initialData: props.market || [],
  }) 
    // const {isPending, error, data} = useQuery({
    //     queryKey: ['market'],
    //     queryFn: async ()=>{
    //         const dta = await axiosInstance.get<Root>(
    //             endpoints.fetchData.market
    //         )
    //         console.log('data', dta);
    //         return dta?.data?.data
    //     }
    // })
    // console.log('market', data);
    
  return (
    <>
      <Container>
                {
                  isPending ? (
                    <>
                    <h1>Loading ...</h1>
                    </>
                  ) : (
                    <>
                      <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: '#262927'}}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>BaseId</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>BaseSymbol</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeId</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PercentExchangeVolume</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PriceQuote</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PriceUsd</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>QouteId</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>QouteSymbol</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Rank</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>TradesCount24Hr</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Updated</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {markets?.map((item: any, key: any) => (
                        <TableRow
                          key={key}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                              {item?.baseId}
                          </TableCell>
                          <TableCell align="right">{item?.baseSymbol}</TableCell>
                          <TableCell align="right">{item?.exchangeId}</TableCell>
                          <TableCell align="right">{item?.percentExchangeVolume}</TableCell>
                          <TableCell align="right">{item?.priceQuote}</TableCell>
                          <TableCell align="right">{item?.priceUsd}</TableCell>
                          <TableCell align="right">{item?.quoteId}</TableCell>
                          <TableCell align="right">{item?.quoteSymbol}</TableCell>
                          <TableCell align="right">{item?.rank}</TableCell>
                          <TableCell align="right">{item?.tradesCount24Hr}</TableCell>
                          <TableCell align="right">{item?.updated}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                    </>
                  )
                }
              </Container>
    </>
  )
}
export default index
