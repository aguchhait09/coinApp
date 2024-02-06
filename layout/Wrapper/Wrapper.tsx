import Footer from "../Footer/Footer"
import Header from "../Header/Header"

interface wrapperPrrops{
    children: React.ReactNode
}

const Wrapper = (props: wrapperPrrops) => {
    const {children} = props
  return (
    <>
      <Header/>
      <main style={{height: "auto"}}>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Wrapper
