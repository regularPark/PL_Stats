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
    ref_std = db.reference('최신 리그 순위/'+ str(int(i / 2) + 1))
    ref_std.update({'순위' : teams[i].text, '팀 이름' : teams[i+1].text, '경기수' : teams[40 + cnt*6].text,'승리' : teams[40 + cnt*6 + 1].text, '무승부' : teams[40 + cnt*6 + 2].text, '패배' : teams[40 + cnt*6 + 3].text, '승점' : teams[40 + cnt*6 + 4].text})

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
    ref_player = db.reference('선수 통계/')
    ref_player.update({
        "득점 순위/" + str(i+1) + "/순위" : players_goal_stats[4*i].text,
        "득점 순위/" + str(i+1) + "/이름" : players_goal_stats[4*i + 1].text.split('\n')[1],
        "득점 순위/" + str(i+1) + "/팀 이름" : players_goal_stats[4*i + 1].text.split('\n')[2],
        "득점 순위/" + str(i+1) + "/골" : players_goal_stats[4*i + 2].text,
        "도움 순위/" + str(i+1) + "/순위" : players_assist_stats[3*i].text,
        "도움 순위/" + str(i+1) + "/이름" : players_assist_stats[3*i + 1].text.split('\n')[1],
        "도움 순위/" + str(i+1) + "/팀 이름" : players_assist_stats[3*i + 1].text.split('\n')[2],
        "도움 순위/" + str(i+1) + "/도움" : players_assist_stats[3*i + 2].text,
        "키 패스 순위/" + str(i+1) + "/순위" : players_kp_stats[3*i].text,
        "키 패스 순위/" + str(i+1) + "/이름" : players_kp_stats[3*i + 1].text.split('\n')[1],
        "키 패스 순위/" + str(i+1) + "/팀 이름" : players_kp_stats[3*i + 1].text.split('\n')[2],
        "키 패스 순위/" + str(i+1) + "/키 패스" : players_kp_stats[3*i + 2].text,
        "드리블 순위/" + str(i+1) + "/순위" : players_db_stats[4*i].text,
        "드리블 순위/" + str(i+1) + "/이름" : players_db_stats[4*i + 1].text.split('\n')[1],
        "드리블 순위/" + str(i+1) + "/팀 이름" : players_db_stats[4*i + 1].text.split('\n')[2],
        "드리블 순위/" + str(i+1) + "/드리블" : players_db_stats[4*i + 2].text,
        "패스 순위/" + str(i+1) + "/순위" : players_tp_stats[4*i].text,
        "패스 순위/" + str(i+1) + "/이름" : players_tp_stats[4*i + 1].text.split('\n')[1],
        "패스 순위/" + str(i+1) + "/팀 이름" : players_tp_stats[4*i + 1].text.split('\n')[2],
        "패스 순위/" + str(i+1) + "/패스" : players_tp_stats[4*i + 2].text,
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
    ref_team = db.reference('팀 통계/')
    ref_team.update({
        "팀 득점 순위/" + str(i+1) + "/순위" : teams_score_stats[i].text.split('\n')[1],
        "팀 득점 순위/" + str(i+1) + "/팀 이름" : teams_score_stats[i].text.split('\n')[2],
        "팀 득점 순위/" + str(i+1) + "/득점" : teams_score_stats[i].text.split('\n')[3],
        "팀 실점 순위/" + str(i+1) + "/순위" : teams_miss_stats[i].text.split('\n')[1],
        "팀 실점 순위/" + str(i+1) + "/팀 이름" : teams_miss_stats[i].text.split('\n')[2],
        "팀 실점 순위/" + str(i+1) + "/실점" : teams_miss_stats[i].text.split('\n')[3],
        "점유율 순위/" + str(i+1) + "/순위" : teams_pos_stats[i].text.split('\n')[1],
        "점유율 순위/" + str(i+1) + "/팀 이름" : teams_pos_stats[i].text.split('\n')[2],
        "점유율 순위/" + str(i+1) + "/점유율" : teams_pos_stats[i].text.split('\n')[3],
        "유효 슈팅 순위/" + str(i+1) + "/순위" : teams_shot_stats[i].text.split('\n')[1],
        "유효 슈팅 순위/" + str(i+1) + "/팀 이름" : teams_shot_stats[i].text.split('\n')[2],
        "유효 슈팅 순위/" + str(i+1) + "/유효 슈팅" : teams_shot_stats[i].text.split('\n')[3],
        "파울 순위/" + str(i+1) + "/순위" : teams_foul_stats[i].text.split('\n')[1],
        "파울 순위/" + str(i+1) + "/팀 이름" : teams_foul_stats[i].text.split('\n')[2],
        "파울 순위/" + str(i+1) + "/파울" : teams_foul_stats[i].text.split('\n')[3],
    })