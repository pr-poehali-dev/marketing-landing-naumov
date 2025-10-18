import json
import os
from typing import Dict, Any
from urllib import request, parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form messages to Telegram
    Args: event with httpMethod, body containing name, phone, message
          context with request_id
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    message = body_data.get('message', '')
    
    if not name or not phone or not message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'All fields are required'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '8032505458:AAGcbc1kC4r5vQwEeschFuyF54bOJpqLJ4c')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '170719594')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    telegram_message = f"""🔔 <b>Новая заявка с сайта-резюме</b>

👤 <b>Имя:</b> {name}
📞 <b>Телефон:</b> {phone}

💬 <b>Сообщение:</b>
{message}
"""
    
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = {
        'chat_id': chat_id,
        'text': telegram_message,
        'parse_mode': 'HTML'
    }
    
    req = request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    response = request.urlopen(req)
    response_data = json.loads(response.read().decode('utf-8'))
    
    if response_data.get('ok'):
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Message sent to Telegram successfully'
            })
        }
    
    return {
        'statusCode': 500,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Failed to send message to Telegram'})
    }