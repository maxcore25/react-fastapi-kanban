import jwt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from pydantic import BaseModel
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

JWT_SECRET = 'myjwtsecret'

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=origins,
    allow_headers=origins,
)


@app.get('/board')
def get_board():
    board_data = {
        'tasks': {
            'task-1': {'id': 'task-1', 'content': 'go to the shop'},
            'task-2': {'id': 'task-2', 'content': 'buy some milk'},
            'task-3': {'id': 'task-3', 'content': 'come back home'},
        },
        'column': {},
        'columnOrder': [],
    }
    return {'board': {}}


if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='127.0.0.1')

    # Or use terminal command: uvicorn main:app --reload
