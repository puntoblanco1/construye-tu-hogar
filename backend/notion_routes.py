import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

NOTION_TOKEN = os.environ.get('NOTION_TOKEN')
LEADS_DB_ID = os.environ.get('NOTION_LEADS_DB', '39bd718c-ae4c-4668-9dc1-a760323f71a4')

headers = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

class LeadRequest(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    message: Optional[str] = None
    source: str = "Website"
    language: str = "Arabic"
    budget: Optional[str] = None
    location: Optional[str] = "Spain"
    goal: Optional[str] = None

@router.post('/leads')
async def create_notion_lead(lead: LeadRequest):
    try:
        url = 'https://api.notion.com/v1/pages'
        
        properties = {
            'Name': {'title': [{'text': {'content': lead.name}}]},
            'Source': {'select': {'name': lead.source}},
            'Stage': {'select': {'name': 'New'}},
            'Last Contact': {'date': {'start': datetime.now(timezone.utc).isoformat()}}
        }
        
        if lead.phone:
            properties['Phone'] = {'phone_number': lead.phone}
        if lead.email:
            properties['Email'] = {'email': lead.email}
        if lead.language:
            properties['Language Preference'] = {'select': {'name': lead.language}}
        if lead.budget:
            properties['Budget Range'] = {'select': {'name': lead.budget}}
        if lead.location:
            properties['Location'] = {'rich_text': [{'text': {'content': lead.location}}]}
        if lead.message or lead.goal:
            notes = lead.message or ''
            if lead.goal:
                notes = f"Goal: {lead.goal}\n{notes}"
            properties['Notes'] = {'rich_text': [{'text': {'content': notes}}]}
        
        payload = {
            'parent': {'database_id': LEADS_DB_ID},
            'properties': properties
        }
        
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return {'success': True, 'lead_id': response.json()['id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/health')
async def health_check():
    return {'status': 'OK', 'notion_connected': NOTION_TOKEN is not None}
