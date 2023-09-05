import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreateEvent from "./CreateEvent";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
        </Routes>
    )
}

export default AllRoutes;