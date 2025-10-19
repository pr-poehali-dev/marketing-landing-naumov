import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Blog API для получения, создания и редактирования статей
    Args: event - dict с httpMethod, body, queryStringParameters, pathParams
          context - object с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(database_url)
    
    try:
        if method == 'GET':
            path_params = event.get('pathParams', {})
            slug = path_params.get('slug')
            
            cursor = conn.cursor()
            
            if slug:
                cursor.execute(
                    "SELECT id, slug, title, excerpt, content, image_url, seo_title, seo_description, published, created_at, updated_at FROM articles WHERE slug = %s",
                    (slug,)
                )
                row = cursor.fetchone()
                
                if not row:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Article not found'})
                    }
                
                article = {
                    'id': row[0],
                    'slug': row[1],
                    'title': row[2],
                    'excerpt': row[3],
                    'content': row[4],
                    'image_url': row[5],
                    'seo_title': row[6],
                    'seo_description': row[7],
                    'published': row[8],
                    'created_at': row[9].isoformat() if row[9] else None,
                    'updated_at': row[10].isoformat() if row[10] else None
                }
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(article)
                }
            else:
                query_params = event.get('queryStringParameters', {})
                include_drafts = query_params.get('drafts') == 'true'
                
                if include_drafts:
                    cursor.execute(
                        "SELECT id, slug, title, excerpt, image_url, published, created_at, updated_at FROM articles ORDER BY created_at DESC"
                    )
                else:
                    cursor.execute(
                        "SELECT id, slug, title, excerpt, image_url, published, created_at, updated_at FROM articles WHERE published = true ORDER BY created_at DESC"
                    )
                
                rows = cursor.fetchall()
                articles = []
                
                for row in rows:
                    articles.append({
                        'id': row[0],
                        'slug': row[1],
                        'title': row[2],
                        'excerpt': row[3],
                        'image_url': row[4],
                        'published': row[5],
                        'created_at': row[6].isoformat() if row[6] else None,
                        'updated_at': row[7].isoformat() if row[7] else None
                    })
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(articles)
                }
        
        elif method == 'POST':
            headers = event.get('headers', {})
            auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
            
            if auth_token != 'yuriyadmin2025':
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO articles (slug, title, excerpt, content, image_url, seo_title, seo_description, published)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, slug, title, excerpt, content, image_url, seo_title, seo_description, published, created_at, updated_at
                """,
                (
                    body_data['slug'],
                    body_data['title'],
                    body_data.get('excerpt', ''),
                    body_data['content'],
                    body_data.get('image_url', ''),
                    body_data.get('seo_title', ''),
                    body_data.get('seo_description', ''),
                    body_data.get('published', False)
                )
            )
            
            row = cursor.fetchone()
            conn.commit()
            
            article = {
                'id': row[0],
                'slug': row[1],
                'title': row[2],
                'excerpt': row[3],
                'content': row[4],
                'image_url': row[5],
                'seo_title': row[6],
                'seo_description': row[7],
                'published': row[8],
                'created_at': row[9].isoformat() if row[9] else None,
                'updated_at': row[10].isoformat() if row[10] else None
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(article)
            }
        
        elif method == 'PUT':
            headers = event.get('headers', {})
            auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
            
            if auth_token != 'yuriyadmin2025':
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            path_params = event.get('pathParams', {})
            article_id = path_params.get('id')
            
            if not article_id:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Article ID required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute(
                """
                UPDATE articles 
                SET slug = %s, title = %s, excerpt = %s, content = %s, image_url = %s, 
                    seo_title = %s, seo_description = %s, published = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, slug, title, excerpt, content, image_url, seo_title, seo_description, published, created_at, updated_at
                """,
                (
                    body_data['slug'],
                    body_data['title'],
                    body_data.get('excerpt', ''),
                    body_data['content'],
                    body_data.get('image_url', ''),
                    body_data.get('seo_title', ''),
                    body_data.get('seo_description', ''),
                    body_data.get('published', False),
                    article_id
                )
            )
            
            row = cursor.fetchone()
            
            if not row:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Article not found'})
                }
            
            conn.commit()
            
            article = {
                'id': row[0],
                'slug': row[1],
                'title': row[2],
                'excerpt': row[3],
                'content': row[4],
                'image_url': row[5],
                'seo_title': row[6],
                'seo_description': row[7],
                'published': row[8],
                'created_at': row[9].isoformat() if row[9] else None,
                'updated_at': row[10].isoformat() if row[10] else None
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(article)
            }
        
        elif method == 'DELETE':
            headers = event.get('headers', {})
            auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
            
            if auth_token != 'yuriyadmin2025':
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            path_params = event.get('pathParams', {})
            article_id = path_params.get('id')
            
            if not article_id:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Article ID required'})
                }
            
            cursor = conn.cursor()
            cursor.execute("DELETE FROM articles WHERE id = %s", (article_id,))
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 204,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': ''
            }
        
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    except Exception as e:
        if conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
