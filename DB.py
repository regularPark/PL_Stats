#-*- coding: euc-kr -*-

import sys
import io

import requests as rq
from bs4 import BeautifulSoup as bs

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

cred = credentials.Certificate("./pl-stats-f97c1-firebase-adminsdk-o2ag2-6b3f8e0cb8.json")
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://pl-stats-f97c1-default-rtdb.firebaseio.com/'
})


RECENT_STANDINGS_URL = "https://www.scoreman.vip/football/database/league-36"

result = rq.get(RECENT_STANDINGS_URL)
result.raise_for_status()

soup = bs(result.text, "lxml")
league_table = soup.find('div', attrs={'class' : 'rankbox'})
teams = league_table.find_all('td')

# SUCCESS TABLE
cnt = 0
for i in range(0, 40, 2):
    ref_std = db.reference('�ֽ� ���� ����/'+ str(int(i / 2) + 1))
    ref_std.update({'����' : teams[i].text, '�� �̸�' : teams[i+1].text, '����' : teams[40 + cnt*6].text,'�¸�' : teams[40 + cnt*6 + 1].text, '���º�' : teams[40 + cnt*6 + 2].text, '�й�' : teams[40 + cnt*6 + 3].text, '����' : teams[40 + cnt*6 + 4].text})

PLAYER_RANK = "https://www.scoreman.vip/football/database/playertech-36"

result_player = rq.get(PLAYER_RANK)
result_player.raise_for_status()

soup_player = bs(result_player.text, "lxml")
player_goal_rank = soup_player.find('table', {'id' : 'Total_Goals'})
players_goal_stats = player_goal_rank.find_all('td')

players_assist_rank = soup_player.find('table',{'id' : 'Total_Assist'})
players_assist_stats = players_assist_rank.find_all('td')

players_kp_rank = soup_player.find('table',{'id' : 'Total_KeyPass'})
players_kp_stats = players_kp_rank.find_all('td')

players_db_rank = soup_player.find('table',{'id' : 'Total_Dribble'})
players_db_stats = players_db_rank.find_all('td')

players_tp_rank = soup_player.find('table',{'id' : 'Total_TotalPass'})
players_tp_stats = players_tp_rank.find_all('td')

print(players_assist_stats[2].text)

for i in range(0, 10):
    ref_player = db.reference('���� ���/')
    ref_player.update({
        "���� ����/" + str(i+1) + "/����" : players_goal_stats[4*i].text,
        "���� ����/" + str(i+1) + "/�̸�" : players_goal_stats[4*i + 1].text.split('\n')[1],
        "���� ����/" + str(i+1) + "/�� �̸�" : players_goal_stats[4*i + 1].text.split('\n')[2],
        "���� ����/" + str(i+1) + "/��" : players_goal_stats[4*i + 2].text,
        "���� ����/" + str(i+1) + "/����" : players_assist_stats[3*i].text,
        "���� ����/" + str(i+1) + "/�̸�" : players_assist_stats[3*i + 1].text.split('\n')[1],
        "���� ����/" + str(i+1) + "/�� �̸�" : players_assist_stats[3*i + 1].text.split('\n')[2],
        "���� ����/" + str(i+1) + "/����" : players_assist_stats[3*i + 2].text,
        "Ű �н� ����/" + str(i+1) + "/����" : players_kp_stats[3*i].text,
        "Ű �н� ����/" + str(i+1) + "/�̸�" : players_kp_stats[3*i + 1].text.split('\n')[1],
        "Ű �н� ����/" + str(i+1) + "/�� �̸�" : players_kp_stats[3*i + 1].text.split('\n')[2],
        "Ű �н� ����/" + str(i+1) + "/Ű �н�" : players_kp_stats[3*i + 2].text,
        "�帮�� ����/" + str(i+1) + "/����" : players_db_stats[4*i].text,
        "�帮�� ����/" + str(i+1) + "/�̸�" : players_db_stats[4*i + 1].text.split('\n')[1],
        "�帮�� ����/" + str(i+1) + "/�� �̸�" : players_db_stats[4*i + 1].text.split('\n')[2],
        "�帮�� ����/" + str(i+1) + "/�帮��" : players_db_stats[4*i + 2].text,
        "�н� ����/" + str(i+1) + "/����" : players_tp_stats[4*i].text,
        "�н� ����/" + str(i+1) + "/�̸�" : players_tp_stats[4*i + 1].text.split('\n')[1],
        "�н� ����/" + str(i+1) + "/�� �̸�" : players_tp_stats[4*i + 1].text.split('\n')[2],
        "�н� ����/" + str(i+1) + "/�н�" : players_tp_stats[4*i + 2].text,
    })



TEAM_RANK = "https://www.scoreman.vip/football/database/leagueteamtech-36"

result_team = rq.get(TEAM_RANK)
result_team.raise_for_status()

soup_team = bs(result_team.text, "lxml")
team_score_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_score_stats = team_score_rank.find_all('tr', {'id' : 'Total_GOALS'})

team_score_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_score_stats = team_score_rank.find_all('tr', {'id' : 'Total_GOALS'})

team_miss_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_miss_stats = team_miss_rank.find_all('tr', {'id' : 'Total_MISS'})

team_pos_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_pos_stats = team_pos_rank.find_all('tr', {'id' : 'Total_BALLCONTROL'})

team_shot_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_shot_stats = team_shot_rank.find_all('tr', {'id' : 'Total_SHOTONGOAL'})

team_foul_rank = soup_team.find('table', attrs={'class' : 'eTable stats'})
teams_foul_stats = team_foul_rank.find_all('tr', {'id' : 'Total_FOULS'})

print(teams_score_stats[0].text)

for i in range(0,20):
    ref_team = db.reference('�� ���/')
    ref_team.update({
        "�� ���� ����/" + str(i+1) + "/����" : teams_score_stats[i].text.split('\n')[1],
        "�� ���� ����/" + str(i+1) + "/�� �̸�" : teams_score_stats[i].text.split('\n')[2],
        "�� ���� ����/" + str(i+1) + "/����" : teams_score_stats[i].text.split('\n')[3],
        "�� ���� ����/" + str(i+1) + "/����" : teams_miss_stats[i].text.split('\n')[1],
        "�� ���� ����/" + str(i+1) + "/�� �̸�" : teams_miss_stats[i].text.split('\n')[2],
        "�� ���� ����/" + str(i+1) + "/����" : teams_miss_stats[i].text.split('\n')[3],
        "������ ����/" + str(i+1) + "/����" : teams_pos_stats[i].text.split('\n')[1],
        "������ ����/" + str(i+1) + "/�� �̸�" : teams_pos_stats[i].text.split('\n')[2],
        "������ ����/" + str(i+1) + "/������" : teams_pos_stats[i].text.split('\n')[3],
        "��ȿ ���� ����/" + str(i+1) + "/����" : teams_shot_stats[i].text.split('\n')[1],
        "��ȿ ���� ����/" + str(i+1) + "/�� �̸�" : teams_shot_stats[i].text.split('\n')[2],
        "��ȿ ���� ����/" + str(i+1) + "/��ȿ ����" : teams_shot_stats[i].text.split('\n')[3],
        "�Ŀ� ����/" + str(i+1) + "/����" : teams_foul_stats[i].text.split('\n')[1],
        "�Ŀ� ����/" + str(i+1) + "/�� �̸�" : teams_foul_stats[i].text.split('\n')[2],
        "�Ŀ� ����/" + str(i+1) + "/�Ŀ�" : teams_foul_stats[i].text.split('\n')[3],
    })