import { useState } from "react";

const PrimaryProps = () => {
    const [categories, setCategories] = useState([]);
    return {
        categories,
        setCategories
    };
}
 
export default PrimaryProps;