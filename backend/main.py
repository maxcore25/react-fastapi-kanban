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


class Task(BaseModel):
    id: str
    content: str


class Tasks(BaseModel):
    __root__: dict[str, Task]


class Column(BaseModel):
    id: str
    title: str
    taskIds: list


class Columns(BaseModel):
    __root__: dict[str, Task]


class Board(BaseModel):
    tasks: Tasks
    columns: Columns
    columnOrder: list


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password = fields.CharField(200)
    board = fields.JSONField(default={'tasks': {}, 'columns': {}, 'columnOrder': []})


User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True, exclude=('board',))

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
        'columns': {
            'column-1': {
                'id': 'column-1',
                'title': 'To do',
                'taskIds': ['task-2', 'task-3']
            },
            'column-2': {
                'id': 'column-2',
                'title': 'Done',
                'taskIds': ['task-1', ]
            },
        },
        'columnOrder': ['column-1', 'column-2'],
    }
    return {'board': board_data}


register_tortoise(
    app,
    db_url='postgres://postgres:Password1@localhost:5432/postgres',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)

if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='127.0.0.1')

    # Or use terminal command: uvicorn main:app --reload
