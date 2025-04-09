export const MockUsers = [
    {
        "id": 1,
        "name": "Ishan Dilmith",
        "email": "ishandilmith@gmail.com",
        "password": "Ishan@1"
    },
    {
        "id": 2,
        "name": "Saman Perera",
        "email": "saman@gmail.com",
        "password": "Saman@1"
    },
    {
        "id": 3,
        "name": "Nimal Perera",
        "email": "nimal@gmail.com",
        "password": "Nimal@1"
    }
]

export const MockRecipies = [
    {
        "id": 1,
        "userId": 1,
        "title": "Chicken Curry",
        "description": "A spicy chicken curry with coconut milk.",
        "cookTime": 45,
        "ingredients": [
            "Chicken",
            "Coconut milk",
            "Spices"
        ],
        "instructions": [
            "Heat oil in a pan.",
            "Add spices and sauté.",
            "Add chicken and cook until done.",
            "Add coconut milk and simmer."
        ],
        "image": "/images/chicken_curry.jpg"
    },
    {
        "id": 2,
        "userId": 2,
        "name": "Vegetable Stir Fry",
        "description": "A quick and easy vegetable stir fry.",
        "cookTime": 45,
        "ingredients": [
            "Mixed vegetables",
            "Soy sauce",
            "Garlic"
        ],
        "instructions": [
            "Heat oil in a pan.",
            "Add garlic and sauté.",
            "Add vegetables and stir fry.",
            "Add soy sauce and cook for a few minutes."
        ],
        "image": "/images/vegetable_stir_fry.jpg"
    }
]