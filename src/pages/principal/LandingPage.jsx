import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar"
import { HeroSession } from "./HeroSession";
import { AboutSession } from "./AboutSession";
import { PaymentSession } from "./PaymentSession";

export const LandingPage = () => {
    return (
        <>
        <div className="bg-violet-50">
            <NavBar />
            {/** Hero */}
            <HeroSession />
        </div>
            {/** About */}
            <AboutSession />
          
            {/** Payment */}
            <PaymentSession />

            <Footer />
        </>
    )
}