import Service from "../models/service.model.js"

export const getServices = async(req,res)=>{
    const services = await Service.find({
        user: req.user.id
    }).populate("user")
    res.json(services)
}
export const getService = async(req,res)=>{
    const serviceFound = await Service.findById(req.params.id)
    if(!serviceFound) return res.status(404).json({messsage:"Servicio no encontrado"})
    res.json(serviceFound)
}
export const createService = async(req,res)=>{
    const  {ref,container,nave,producto,diasLibres,depotDevolucion} = req.body
    const newService = await Service.create({
        ref,
        container,
        nave, 
        producto, 
        diasLibres,
        depotDevolucion,
        retiroPuerto:"",
        presentacion:"",
        fechaDev:"",
        choferRetira:"",
        choferEntrega:"",
        choferDevuelve: "",
        facProveedor: "",
        statusFacProveedor: "",
        facServicio:"",
        statusFacServicio: "",
        user:req.user.id
    })
    res.json(newService)
}
export const deleteService = async(req,res)=>{
    const serviceFound = await Service.findByIdAndDelete(req.params.id)
    if(!serviceFound) return res.status(404).json({messsage:"Servicio no encontrado"})
    // return res.sendStatus(204)
    res.json(serviceFound)

}
export const updateService = async(req,res)=>{
    const serviceFound = await Service.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!serviceFound) return res.status(404).json({messsage:"Servicio no encontrado"})
    res.json(serviceFound)
}

