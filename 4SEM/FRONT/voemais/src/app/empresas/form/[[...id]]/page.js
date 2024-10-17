'use client'

import Pagina from "@/app/components/Pagina";
import EmpresaValidator from "@/validators/EmpresaValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { v4 } from "uuid";

export default function Page({params}) {

const route = useRouter()

const empresas = JSON.parse(localStorage.getItem('empresas')) || []
const dados = empresas.find(item=>item.id == params.id)
const empresa = dados || { nome: '', logo: '', site: '' }


function salvar(dados){

    if(empresa.id){
    Object.assign(empresa, dados)
}else{
    dados.id = v4()
    empresas.push(dados)
}
    localStorage.setItem('empresas', JSON.stringify(empresas))
    return route.push('/empresas')
}

    return (
        <Pagina titulo="Empresa">
            
            <Formik
                initialValues={empresa}
                validationSchema={EmpresaValidator} //Adicionamos esse pedaço de código
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                }) => {
                        return (
                            <Form>
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange('nome')}
                                    />
                                    <div>{errors.nome}</div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="logo">
                                    <Form.Label>Logo</Form.Label>
                                    <Form.Control type="text"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange('logo')}
                                    />
                                </Form.Group>
        
                                <Form.Group className="mb-3" controlId="site">
                                    <Form.Label>Site</Form.Label>
                                    <Form.Control type="text"
                                    name="site"
                                    value={values.site}
                                    onChange={handleChange('site')}
                                    />
                                </Form.Group>
        
                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        Salvar  <FaCheck />
                                    </Button>
                                    <Link href="/empresas" className="btn btn-danger ms-3" >
                                        <IoIosArrowRoundBack /> Voltar
                                    </Link>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Pagina>
    )
}