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
    ref_std = db.reference('league_rank/'+ str(int(i / 2) + 1))
    ref_std.update({'rank' : teams[i].text, 'team_name' : teams[i+1].text, 'G' : teams[40 + cnt*6].text,'W' : teams[40 + cnt*6 + 1].text, 'D' : teams[40 + cnt*6 + 2].text, 'L' : teams[40 + cnt*6 + 3].text, 'Pt' : teams[40 + cnt*6 + 4].text})
    cnt += 1


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
    ref_player = db.reference('player_stats/')
    ref_player.update({
        "score_rank/" + str(i+1) + "/rank" : players_goal_stats[4*i].text,
        "score_rank/" + str(i+1) + "/name" : players_goal_stats[4*i + 1].text.split('\n')[1],
        "score_rank/" + str(i+1) + "/team_name" : players_goal_stats[4*i + 1].text.split('\n')[2],
        "score_rank/" + str(i+1) + "/goal" : players_goal_stats[4*i + 2].text,
        "assist_rank/" + str(i+1) + "/rank" : players_assist_stats[3*i].text,
        "assist_rank/" + str(i+1) + "/name" : players_assist_stats[3*i + 1].text.split('\n')[1],
        "assist_rank/" + str(i+1) + "/team_name" : players_assist_stats[3*i + 1].text.split('\n')[2],
        "assist_rank/" + str(i+1) + "/assist" : players_assist_stats[3*i + 2].text,
        "key_pass_rank/" + str(i+1) + "/rank" : players_kp_stats[3*i].text,
        "key_pass_rank/" + str(i+1) + "/name" : players_kp_stats[3*i + 1].text.split('\n')[1],
        "key_pass_rank/" + str(i+1) + "/team_name" : players_kp_stats[3*i + 1].text.split('\n')[2],
        "key_pass_rank/" + str(i+1) + "/key_pass" : players_kp_stats[3*i + 2].text,
        "dribble_rank/" + str(i+1) + "/rank" : players_db_stats[4*i].text,
        "dribble_rank/" + str(i+1) + "/name" : players_db_stats[4*i + 1].text.split('\n')[1],
        "dribble_rank/" + str(i+1) + "/team_name" : players_db_stats[4*i + 1].text.split('\n')[2],
        "dribble_rank/" + str(i+1) + "/dribble" : players_db_stats[4*i + 2].text,
        "pass_rank/" + str(i+1) + "/rank" : players_tp_stats[4*i].text,
        "pass_rank/" + str(i+1) + "/name" : players_tp_stats[4*i + 1].text.split('\n')[1],
        "pass_rank/" + str(i+1) + "/team_name" : players_tp_stats[4*i + 1].text.split('\n')[2],
        "pass_rank/" + str(i+1) + "/pass" : players_tp_stats[4*i + 2].text,
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
    ref_team = db.reference('team_stats/')
    ref_team.update({
        "team_score_rank/" + str(i+1) + "/rank" : teams_score_stats[i].text.split('\n')[1],
        "team_score_rank/" + str(i+1) + "/team_name" : teams_score_stats[i].text.split('\n')[2],
        "team_score_rank/" + str(i+1) + "/score" : teams_score_stats[i].text.split('\n')[3],
        "team_miss_rank/" + str(i+1) + "/rank" : teams_miss_stats[i].text.split('\n')[1],
        "team_miss_rank/" + str(i+1) + "/team_name" : teams_miss_stats[i].text.split('\n')[2],
        "team_miss_rank/" + str(i+1) + "/miss" : teams_miss_stats[i].text.split('\n')[3],
        "possession_rank/" + str(i+1) + "/rank" : teams_pos_stats[i].text.split('\n')[1],
        "possession_rank/" + str(i+1) + "/team_name" : teams_pos_stats[i].text.split('\n')[2],
        "possession_rank/" + str(i+1) + "/possession" : teams_pos_stats[i].text.split('\n')[3],
        "shot_on_target_rank/" + str(i+1) + "/rank" : teams_shot_stats[i].text.split('\n')[1],
        "shot_on_target_rank/" + str(i+1) + "/team_name" : teams_shot_stats[i].text.split('\n')[2],
        "shot_on_target_rank/" + str(i+1) + "/shot_on_target" : teams_shot_stats[i].text.split('\n')[3],
        "foul_rank/" + str(i+1) + "/rank" : teams_foul_stats[i].text.split('\n')[1],
        "foul_rank/" + str(i+1) + "/team_name" : teams_foul_stats[i].text.split('\n')[2],
        "foul_rank/" + str(i+1) + "/foul" : teams_foul_stats[i].text.split('\n')[3],
    })