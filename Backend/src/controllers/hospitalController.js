import Hospital from "../models/Hospital.js";

export const getHospitalData = async(req, res) =>{
    try {
        const {hospitalId} = req.params;
        console.log("Received ID:", hospitalId);
        const hospitalData = await Hospital.findById(hospitalId);

        if(!hospitalData){
            return res.status(404).send({
                data: hospitalData,
                message: "The Hospital is not found."
            })
        }
        return res.status(200).send({
            data: hospitalData,
            message: "Hospital data retrieved successfully."
        })
    } catch (error) {
        console.error("Error fetching hospital data:", error);
        return res.status(500).send({
            message : 'Error fetching hospital data',
            details : error.message
        })
    }
}