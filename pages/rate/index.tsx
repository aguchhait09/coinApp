import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../api"
import { endpoints } from "../api/endpoints.config"
import { RootRate } from "@/typescript/rate.interface"
import { Box, Button, Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { RateDetails } from "@/typescript/rateDetails.interface"
import { GetServerSideProps } from "next"

// Modal Style
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// SSR
export const rateFUnc = async () => {
  const dta = await axiosInstance.get<RootRate>(
    endpoints.fetchData.rate
  )
  // console.log('rate', dta);
  return dta?.data?.data
}

export async function getServerSideProps() {
  const rateList = await rateFUnc()
  return { props: { rateList } }
}

  const index = (props: any) => {
    const { isPending, data: rate } = useQuery({
      queryKey: ['rateL'],
      queryFn: rateFUnc,
      initialData: props.rateList || [],
    })  

    // RAte Details Data
    const [uniqeId, setUniqueId] = useState("")
    const { data: RateDetails } = useQuery({
      queryKey: ['singleRate', [uniqeId]],
      enabled: !!uniqeId,
      queryFn: async () => {
        const res = await axiosInstance.get<RateDetails>(
          endpoints.fetchData.singleRate(`${uniqeId}`)
        )
        console.log('Srate', res);

        return res?.data?.data
      }
    })
    console.log('RateDetails', RateDetails);


    // Modal 
    console.log('id', uniqeId);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    // Custom Function for Modal
    const click = (data: string) => {
      setUniqueId(data)
      handleOpen()
    }

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
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >currencySymbol</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Id</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>RateUsd</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Symbol</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rate?.map((item: any, key: any) => (
                        <TableRow
                          key={key}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          onClick={() => click(`${item?.id}`)}
                          hover
                        >
                          <TableCell align="right">{item?.currencySymbol}</TableCell>
                          <TableCell align="right">{item?.id}</TableCell>
                          <TableCell align="right">{item?.rateUsd}</TableCell>
                          <TableCell align="right">{item?.symbol}</TableCell>
                          <TableCell align="right">{item?.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{
                    ...style, width: 'auto', background: 'radial-gradient(circle, rgba(224,213,218,1) 0%, rgba(183,201,222,1) 100%)'
                  }}>
                    <h2 id="child-modal-title">{RateDetails?.id?.toUpperCase()}</h2>
                    <hr />
                    <p id="child-modal-description">
                      CurrencySymbol: {RateDetails?.currencySymbol}
                    </p>
                    <p id="child-modal-description">
                      RateUsd: {RateDetails?.rateUsd}
                    </p>
                    <p id="child-modal-description">
                      Symbol: {RateDetails?.symbol}
                    </p>
                    <p id="child-modal-description">
                      Type: {RateDetails?.type}
                    </p>
                    <Button variant="contained" sx={{
                      background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
                    }} onClick={handleClose}>Close</Button>
                  </Box>
                </Modal>
              </Container>
            </>
          )
        }
      </>
    )
  }

  export default index
