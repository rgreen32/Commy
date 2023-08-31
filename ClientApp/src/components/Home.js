import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import axios from "axios";
import { useEffect, useState } from 'react';
import CategoryModal from './CategoryModal';
export function Home() {
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({})

    function getCategories() {
        var response = axios.get("https://localhost:7089/categories")
        response.then(res => {
            console.log(res.data)
            setCategories(res.data)
        })
    }

    useEffect(function () {
        getCategories()
    }, [])

    var categoriesHTML = []
    for (let i = 0; i < categories.length; i += 2) {
        let element = <Row>
            <Col className='m-2'>
                <Card>
                    <Card.Body>
                        <Card.Title>{categories[i].name}</Card.Title>
                        <Card.Text>{categories[i].description}</Card.Text>
                        <Button className='mx-2' onClick={() => {
                            setModalOpen(true)
                            setSelectedCategory(categories[i])
                        }}>Edit</Button>
                    </Card.Body>
                </Card>
            </Col>
            {(i + 1 < categories.length) && 
                <Col className='m-2'>
                    <Card>
                        <Card.Body>
                            <Card.Title>{categories[i + 1].name}</Card.Title>
                            <Card.Text>{categories[i + 1].description}</Card.Text>
                            <Button className='mx-2' onClick={() => {
                                setModalOpen(true)
                                setSelectedCategory(categories[i + 1])
                            }}>Edit</Button>

                        </Card.Body>
                    </Card>
                </Col>
            }
        </Row>
        categoriesHTML.push(element)
    }
    return (
        <>
            <Container className='border border-success text-center'>
                {categoriesHTML}
            </Container>
            <CategoryModal
                selectedCategory={selectedCategory}
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                categories={categories}
                setCategories={setCategories}
            />
        </>
    );

}
