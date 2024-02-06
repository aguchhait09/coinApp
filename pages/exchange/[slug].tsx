import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"
import { axiosInstance } from "../api";
import { Root } from "@/typescript/common.all.interface";
import { endpoints } from "../api/endpoints.config";
import { exchange } from "@/typescript/exchangeSingle.interface";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const singleExchange = () => {
    const router = useRouter()
    console.log('router', router);
    
    const {slug} = router?.query
    console.log('slug', slug);
    
    const {isPending, error, data} = useQuery({
        queryKey: ['singleExchange', [slug]],
        enabled: !!slug,
        queryFn: async ()=>{
            const dta = await axiosInstance.get<exchange>(
                endpoints.fetchData.singleExchange(`${slug}`)
            )
            console.log('ExchangeSingle', dta);
            return dta?.data?.data
        }
    })
    console.log('data', data);
    
  return (
    <>
      <Container>
      <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: '#262927'}}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeId</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeUrl</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PercentTotalVolume</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Rank</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>TradingPairs</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Updated</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>VolumeUsd</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none' }}
                        >
                          <TableCell component="th" scope="row">
                              {data?.exchangeId}
                          </TableCell>
                          <TableCell align="right">{data?.exchangeUrl}</TableCell>
                          <TableCell align="right">{data?.name}</TableCell>
                          <TableCell align="right">{data?.name}</TableCell>
                          <TableCell align="right">{data?.percentTotalVolume}</TableCell>
                          <TableCell align="right">{data?.rank}</TableCell>
                          <TableCell align="right">{data?.tradingPairs}</TableCell>
                          <TableCell align="right">{data?.updated}</TableCell>
                          <TableCell align="right">{data?.volumeUsd}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
      </Container>
    </>
  )
}

export default singleExchange
