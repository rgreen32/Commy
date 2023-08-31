import { useState } from "react"
import { Modal, Button, Form, Card } from "react-bootstrap"
import axios from "axios"
function CategoryModal({ isOpen, setIsOpen, selectedCategory, categories, setCategories }) {
  var categoryUpdate = { ...selectedCategory }
  function updateCategory() {
    axios.put("https://localhost:7089/categories", categoryUpdate)
      .then(response => {
        let updatedCategories = [...categories]
        let index = updatedCategories.findIndex((element) => {
          return element.id == categoryUpdate.id
        })
        updatedCategories[index] = categoryUpdate
        setCategories(updatedCategories)
      })
    setIsOpen(false)
  }

  function deleteCategory() {
    axios.delete("https://localhost:7089/categories", { "params": { id: selectedCategory.id } })
      .then(response => {
        let updatedCategories = [...categories]
        let index = updatedCategories.find((element) => {
          return element.id == selectedCategory.id
        })
        updatedCategories.splice(index, 1)
        setCategories(updatedCategories)
        setIsOpen(false)
      })
  }
  return <Modal show={isOpen} onHide={() => { setIsOpen(false) }}>
    <Modal.Body className="text-center">
      <Form onSubmit={(event) => {
        event.preventDefault()
        updateCategory()
      }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(event) => {
            categoryUpdate["name"] = event.target.value
          }} type="text" placeholder={selectedCategory.name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={(event) => {
            categoryUpdate["description"] = event.target.value
          }} type="text" placeholder={selectedCategory.description} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button className='mx-2' onClick={() => {
          deleteCategory()
        }}>Delete</Button>
      </Form>
        {selectedCategory?.products?.map((element) => {
          return <Card className="my-2 mx-auto w-50">
            <Card.Title>{element.name}</Card.Title>
            </Card>
        })}
    </Modal.Body>

  </Modal>
}

export default CategoryModal;