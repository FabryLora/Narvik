import { createBrowserRouter, Navigate } from "react-router-dom";
import AcoplesRapidos from "./views/AcoplesRapidos";
import AcoplesRapidosView from "./views/AcoplesRapidosView";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Calidad from "./views/Calidad";
import CategoriasAdmin from "./views/CategoriasAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import ListaDePrecios from "./views/ListaDePrecios";
import Login from "./views/Login";
import Mangueras from "./views/Mangueras";
import ManguerasView from "./views/ManguerasView";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import Novedades from "./views/Novedades";
import Pedidos from "./views/Pedidos";
import PrivateProducts from "./views/PrivateProducts";
import PrivateZone from "./views/PrivateZone";
import Productos from "./views/Productos";
import ProductosAdmin from "./views/ProductosAdmin";
import ProductosView from "./views/ProductosView";
import RealProducts from "./views/RealProducts";
import Signup from "./views/Signup";
import SliderAdmin from "./views/SliderAdmin";
import TerminalesView from "./views/TerminalesView";
import TerminalesyAccesorios from "./views/TerminalesyAccesorios";
import UsuariosAdmin from "./views/UsuariosAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/registro",
        element: <Signup />,
    },
    {
        path: "/iniciar-sesion",
        element: <Login />,
    },
    {
        path: "/inicio",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inicio",
                element: <Navigate to={"/"} />,
            },
            {
                path: "/inicio/nosotros",
                element: <Nosotros />,
            },
            {
                path: "/inicio/acoples-rapidos-hidraulicos",
                element: <AcoplesRapidos />,
            },
            {
                path: "/inicio/acoples-rapidos-hidraulicos/:id",
                element: <AcoplesRapidosView />,
            },
            {
                path: "/inicio/terminales-y-accesorios",
                element: <TerminalesyAccesorios />,
            },
            {
                path: "/inicio/terminales-y-accesorios/:id",
                element: <TerminalesView />,
            },

            {
                path: "/inicio/mangueras",
                element: <Mangueras />,
            },
            {
                path: "/inicio/mangueras/:id",
                element: <ManguerasView />,
            },
            {
                path: "/inicio/productos",
                element: <Productos />,
            },
            {
                path: "/inicio/productos/:id",
                element: <ProductosView />,
            },
            {
                path: "/inicio/calidad",
                element: <Calidad />,
            },
            {
                path: "/inicio/novedades",
                element: <Novedades />,
            },
            {
                path: "/inicio/contacto",
                element: <Contacto />,
            },
        ],
    },
    {
        path: "/adm",
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <Administrator />,
        children: [
            {
                path: "/dashboard/nosotros",
                element: <NosotrosAdmin />,
            },
            {
                path: "/dashboard/slider",
                element: <SliderAdmin />,
            },
            {
                path: "/dashboard/categorias",
                element: <CategoriasAdmin />,
            },
            {
                path: "/dashboard/grupo-de-productos",
                element: <ProductosAdmin />,
            },
            {
                path: "/dashboard/productos",
                element: <RealProducts />,
            },
            {
                path: "/dashboard/contacto-admin",
                element: <ContactoAdmin />,
            },
            {
                path: "/dashboard/usuarios",
                element: <UsuariosAdmin />,
            },
        ],
    },
    {
        path: "/privado",
        element: <PrivateZone />,
        children: [
            {
                path: "/privado",
                element: <Navigate to={"/privado/productos"} />,
            },
            {
                path: "/privado/productos",
                element: <PrivateProducts />,
            },
            {
                path: "/privado/pedido",
                element: <Pedidos />,
            },
            {
                path: "/privado/lista-de-precios",
                element: <ListaDePrecios />,
            },
        ],
    },
]);

export default router;
