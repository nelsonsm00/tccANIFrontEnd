/* IMPORT REACT */
import React from "react";
import { IoPeopleCircle, IoDocumentTextSharp } from "react-icons/io5";
import { AiOutlineFolderOpen, AiFillHome, AiOutlineCloseSquare } from "react-icons/ai";
import { MdFoodBank } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { pushRotate as MenuBurger } from "react-burger-menu";

export default () => {
    return (
        <MenuBurger width={280} pageWrapId="page-wrap" outerContainerId="outer-container" pushRotate>
            <a id="about" className="menu-item" href="/Home">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <AiFillHome />
                </i>
                <span> </span> Home
            </a>
            <a id="about" className="menu-item" href="/Tratamento/Listagem">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <AiOutlineFolderOpen />
                </i>
                <span> </span> Tratamentos
            </a>
            <a id="about" className="menu-item" href="/Paciente/Listagem">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <IoPeopleCircle />
                </i>
                <span> </span> Pacientes
            </a>
            <a id="about" className="menu-item" href="/Refeicao/Listagem">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <MdFoodBank />
                </i>
                <span> </span> Refeições
            </a>
            <a id="about" className="menu-item" href="/Orientacao/Listagem">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <HiOutlineDocumentAdd />
                </i>
                <span> </span> Orientações
            </a>
            <a id="about" className="menu-item" href="/Formulario/Listagem">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <IoDocumentTextSharp />
                </i>
                <span> </span> Formulario
            </a>
            <a id="about" className="menu-item" href="/Logoff">
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }}>
                    <AiOutlineCloseSquare />
                </i>
                <span> </span> Sair
            </a>
        </MenuBurger>
    );
};