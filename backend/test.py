from openai_utilts import  extract_details


messages: list[dict[str, str]] = [
    {"role": "system", "content": "You are a restaurent service bot trying to accept the order of a customer.You need to extract the order details from the customer."},
    {"role": "user", "content": "I want to order 3 shawarma roll and a coke.Deliver to Kochi;."},
    
]


print(extract_details(messages))
