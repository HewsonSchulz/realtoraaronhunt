import os
import json
from json.decoder import JSONDecodeError
from django.http import HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from .view_utils import calc_missing_props


@csrf_exempt
def submit(request):
    '''info submition

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
                {
                    'message': 'Your request contains invalid json',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        missing_props_msg = calc_missing_props(req_body, ['name', 'email', 'phone_num'])
        if missing_props_msg:
            return JsonResponse(
                {'valid': False, 'message': missing_props_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        name = req_body['name'].strip()
        email = req_body['email'].strip()
        phone_num = req_body['phone_num'].strip()
        agent_name = req_body.get('agent_name', None)

        # prepare email subject and message
        subject = f'''New contact info from {name}'''
        message = f'''Name: {name}
Email: {email}
Phone Number: {phone_num}'''

        if agent_name is not None:
            message += f'''
Currently working with an agent.
Agent's name: {agent_name.strip()}'''
        else:
            message += '''
Not currently working with an agent.'''

        # send email
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=os.getenv('RECIPIENT_EMAILS', '').split(','),
            fail_silently=False,
        )

        if agent_name is not None:
            return JsonResponse(
                {
                    'valid': True,
                    'name': name,
                    'email': email,
                    'phone_num': phone_num,
                    'agent_name': agent_name.strip(),
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {'valid': True, 'name': name, 'email': email, 'phone_num': phone_num},
                status=status.HTTP_201_CREATED,
            )
    else:
        return HttpResponseNotAllowed(['POST'])
