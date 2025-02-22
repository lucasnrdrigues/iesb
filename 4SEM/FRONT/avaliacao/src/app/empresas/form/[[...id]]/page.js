'use client'

import Pagina from "@/app/components/Pagina";
import EmpresaValidator from "../../../validators/EmpresaValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask } from "remask"; // Importando máscara

export default function Page({ params }) {

    const route = useRouter()

    const empresas = JSON.parse(localStorage.getItem('empresas')) || []
    const dados = empresas.find(item => item.id == params.id)
    const empresa = dados || { nome: '', logo: '', site: '' }

    function salvar(dados) {

        if (empresa.id) {
            Object.assign(empresa, dados)
        } else {
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
                validationSchema={EmpresaValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue, //para aplicar as máscaras
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
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone para contato</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    isInvalid={errors.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="logo">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange('logo')}
                                    isInvalid={errors.logo}
                                />
                                <div className="text-danger">{errors.logo}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="site">
                                <Form.Label>Site</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="site"
                                    value={values.site}
                                    onChange={handleChange('site')}
                                    isInvalid={errors.site}
                                />
                                <div className="text-danger">{errors.site}</div>
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/empresas"
                                    className="btn btn-danger ms-2"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Pagina>
    )
}
