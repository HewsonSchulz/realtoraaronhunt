from datetime import datetime, timedelta


def calc_missing_props(req_body, missing_props):
    missing = [
        prop
        for prop in missing_props
        if prop not in req_body or str(req_body[prop]).strip() == ''
    ]
    if missing:
        return f'''Missing propert{'y' if len(missing) == 1 else 'ies'}: {', '.join(missing)}'''
    return None


# generates an object with info about given date
def get_date_info(datetime_str=None):
    if datetime_str:
        try:
            # try parsing with date and time
            datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            # try parsing with only date
            datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d')
    else:
        # TODO: make this not have to manually adjust by 1 hour
        datetime_obj = datetime.now() - timedelta(hours=1)

    year = datetime_obj.year
    month = datetime_obj.strftime('%B')
    month_num = datetime_obj.month
    day = datetime_obj.day
    weekday = datetime_obj.strftime('%A')
    datetime_str = datetime_obj.strftime('%Y-%m-%d %H:%M:%S')
    time = datetime_obj.strftime('%H:%M')
    hour = datetime_obj.strftime('%I')
    minute = datetime_obj.strftime('%M')
    am_pm = datetime_obj.strftime('%p').lower()
    mer_time = f'''{hour.lstrip('0')}:{minute}{am_pm}'''
    date_str = datetime_obj.strftime('%Y-%m-%d')

    date_info = {
        'year': year,
        'month': month,
        'month_num': month_num,
        'day': day,
        'weekday': weekday,
        'datetime': datetime_str,
        'date': date_str,
        'time': time,
        'mer_time': mer_time,
    }

    return date_info
