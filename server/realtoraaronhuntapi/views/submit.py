import os
import json
from json.decoder import JSONDecodeError
from django.http import HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from .view_utils import calc_missing_props, get_date_info, calc_invalid_dict


@csrf_exempt
def submit(request):
    '''info submission

    expected input:
    { 'name': 'Hewson Schulz',
    'email': 'hewsonschulz@bruh.com',
    'phone_num': '123-456-7890',
    'agent_name': 'Agent 007' }
    '''

    if request.method == 'POST':
        try:
            req_body = json.loads(request.body)
        except JSONDecodeError as ex:
            return JsonResponse(
                {'message': 'Your request contains invalid json', 'error': ex.args[0]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            agent_name = req_body.get('agent_name', None)
            if agent_name is not None:
                agent_name = agent_name.strip()

            missing_props_msg = calc_missing_props(
                req_body, ['name', 'email', 'phone_num']
            )
            if missing_props_msg or agent_name == '':
                is_invalid = calc_invalid_dict(req_body, ['name', 'email', 'phone_num'])
                is_invalid['agent_name'] = agent_name == ''

                return JsonResponse(
                    {
                        'valid': False,
                        'message': missing_props_msg,
                        'is_invalid': is_invalid,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            name = req_body['name'].strip()
            email = req_body['email'].strip()
            phone_num = req_body['phone_num'].strip()
            date = f'''{get_date_info()['date']} {get_date_info()['mer_time']}'''

            # prepare email subject and message
            subject = f'''New contact info from {name}'''
            message = f'''Name: {name}
Email: {email}
Phone Number: {phone_num}'''

            if agent_name is not None:
                message += f'''
Currently working with an agent.
Agent's name: {agent_name}
Date: {date}'''
            else:
                message += f'''
Not currently working with an agent.
Date: {date}'''

            # send email
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=os.getenv('RECIPIENT_EMAILS', '').split(','),
                fail_silently=False,
            )

            response_data = {
                'valid': True,
                'name': name,
                'email': email,
                'phone_num': phone_num,
                'date': date,
            }

            if agent_name is not None:
                response_data['agent_name'] = agent_name

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return JsonResponse(
                {'error': ex.args[0]},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return HttpResponseNotAllowed(['POST'])
