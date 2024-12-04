import Hospital from "../models/Hospital.js";

export const getHospitalData = async(req, res) =>{
    try {
        const {hospotalId} = req.params;
        const hospitalData = await Hospital.findById(hospotalId);

        if(!hospitalData){
            return res.status(404).send({
                data: hospitalData,
                message: "The Hospital is not found."
            })
        }
        return res.status(200).send({
            data: hospitalData
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Error fetching hospital data',
            message: error.message
        })
    }
}