import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"
import { axiosInstance } from "./api";
import { endpoints } from "./api/endpoints.config";
import { Root } from "@/typescript/common.all.interface";
import { Hist } from "@/typescript/history.interface";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SingleAsset } from "@/typescript/singleAsset.interface";
import { AssetMarket } from "@/typescript/market.interface";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const singleAsset = () => {
  const router = useRouter()
  console.log('router', router);

  const { slug } = router.query
  console.log('slug', slug);

  // Assest Details
  const { isPending, error, data } = useQuery({
    queryKey: ['singleAsset', [slug]],
    enabled: !!slug,
    queryFn: async () => {
      const dta = await axiosInstance.get<SingleAsset>(
        endpoints.fetchData.singleAssets(`${slug}`)
      )
      console.log('dta', dta);
      return dta?.data?.data
    }
  })
  console.log('data', data);

  // History Data
  const { isLoading, data: history } = useQuery({
    queryKey: ['historyData', [slug]],
    enabled: !!slug,
    queryFn: async () => {
      const dta = await axiosInstance.get<Hist>(
        endpoints.fetchData.historyAssets(`${slug}`)
      )
      console.log('Histdta', dta);

      return dta?.data?.data
    }
  })
  console.log('hist', history);

  // Market

  const { isPending: loading, data: assetMarket } = useQuery({
    queryKey: ['assetMarket', [slug]],
    enabled: !!slug,
    queryFn: async () => {
      const dta = await axiosInstance.get<AssetMarket>(
        endpoints.fetchData.assetMarket(`${slug}`)
      )
      console.log('dta', dta);

      return dta?.data?.data
    }
  })
  console.log('market', assetMarket);

  return (
    <>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#262927' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ChangePercent24Hr</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Explorer</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Id</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>MarketCapUsd</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>MaxSupply</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PriceUsd</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Rank</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Supply</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Symbol</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>VolumeUsd24Hr</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Vwap24Hr</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data?.changePercent24Hr}
                    </TableCell>
                    <TableCell align="right">{data?.explorer}</TableCell>
                    <TableCell align="right">{data?.id}</TableCell>
                    <TableCell align="right">{data?.marketCapUsd}</TableCell>
                    <TableCell align="right">{data?.maxSupply}</TableCell>
                    <TableCell align="right">{data?.name}</TableCell>
                    <TableCell align="right">{data?.priceUsd}</TableCell>
                    <TableCell align="right">{data?.rank}</TableCell>
                    <TableCell align="right">{data?.supply}</TableCell>
                    <TableCell align="right">{data?.symbol}</TableCell>
                    <TableCell align="right">{data?.volumeUsd24Hr}</TableCell>
                    <TableCell align="right">{data?.vwap24Hr}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#262927' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Date</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Price Usd</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    history?.map((item, key) => {
                      return (
                        <>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {item?.date}
                            </TableCell>
                            <TableCell align="right">{item?.priceUsd}</TableCell>
                            <TableCell align="right">{item?.time}</TableCell>
                          </TableRow>
                        </>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#262927' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>BaseId</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>BaseSymbol</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>ExchangeId</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>PriceUsd</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>QuoteId</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>QuoteSymbol</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>VolumePercent</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>VolumeUsd24Hr</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    assetMarket?.map((item, key) => {
                      return (
                        <>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            key={key}
                          >
                            <TableCell component="th" scope="row">
                              {item?.baseId}
                            </TableCell>
                            <TableCell align="right">{item?.baseSymbol}</TableCell>
                            <TableCell align="right">{item?.exchangeId}</TableCell>
                            <TableCell align="right">{item?.priceUsd}</TableCell>
                            <TableCell align="right">{item?.quoteId}</TableCell>
                            <TableCell align="right">{item?.quoteSymbol}</TableCell>
                            <TableCell align="right">{item?.volumePercent}</TableCell>
                            <TableCell align="right">{item?.volumeUsd24Hr}</TableCell>
                          </TableRow>
                        </>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default singleAsset
