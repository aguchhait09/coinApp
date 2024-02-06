import { Root } from "@/typescript/common.all.interface"
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { axiosInstance } from "../api"
import { endpoints } from "../api/endpoints.config"
import { ExchangeRoot } from "@/typescript/exchange.interface"

function index() {

  const { isPending, error, data } = useQuery({
    queryKey: ['exchanges'],
    queryFn: async () => {
      const dta = await axiosInstance.get<ExchangeRoot>(
        endpoints.fetchData.exchanges
      )
      console.log('data', dta);
      return dta?.data?.data
    }
  })
  console.log('exchanges', data);

  return (
    <>
      {
        isPending ? (
          <>
            <h1>Loading ...</h1>
          </>
        ) : (
          <>
            <Container>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#262927' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeId</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeUrl</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PercentTotalVolume</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Rank</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Socket</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>TradingPairs</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Updated</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>VolumeUsd</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((item, key) => (
                      <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none' }}
                        component={Link}
                        href={`/exchange/${item?.exchangeId}`}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {item?.exchangeId}
                        </TableCell>
                        <TableCell align="right">{item?.exchangeUrl}</TableCell>
                        <TableCell align="right">{item?.name}</TableCell>
                        <TableCell align="right">{item?.percentTotalVolume}</TableCell>
                        <TableCell align="right">{item?.rank}</TableCell>
                        <TableCell align="right">{`${item?.socket}`}</TableCell>
                        <TableCell align="right">{item?.tradingPairs}</TableCell>
                        <TableCell align="right">{item?.updated}</TableCell>
                        <TableCell align="right">{item?.volumeUsd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </>
        )
      }
    </>
  )
}

export default index
