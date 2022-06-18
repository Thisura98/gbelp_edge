# This is a Python3 script to visualize my commit history.
# color scheme = https://colorhunt.co/palette/1a1a402700827a0bc0fa58b6

import subprocess
import re
from datetime import datetime
import pandas as pd
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
import matplotlib.pyplot as plt

# -- old method by using another script

# pathToCommitHistoryScript = './write_commit_history.sh'
# pathToCommitHistoryOutput = '../thinking/CommitHistory/history.log'

# subprocess.call(['sh', pathToCommitHistoryScript])
# commitHistory = open(pathToCommitHistoryOutput, 'r').readlines()

# commitHistoryCommand = 'git log --format="%h %ci %s"'

# -- new method by using subprocess output Pipe

commitHistoryOutput = subprocess.Popen(['git', 'log', '--format="%h %ci %s"'], 
    stdout=subprocess.PIPE)
commitHistoryBytes,commitHistoryError = commitHistoryOutput.communicate()

if (commitHistoryError):
    print("Error occurred in history processing:", commitHistoryError)
    exit()

commitHistoryStr = commitHistoryBytes.decode('utf-8')
commitHistory = commitHistoryStr.split('\n')
commitHistory = list(map(lambda x: x.strip('"'), commitHistory))

print("Git Log output successfully obtained")

datesAndCommits = {}
dates = []
commits = []

def processHistory(historyArr):
    pattern = re.compile('^.{7} (.{10})')

    for line in historyArr:
        line = line.strip()
        result = pattern.search(line)

        if (result):
            dateStr = result.groups()[0]
            key = datetime.strptime(dateStr, '%Y-%m-%d')
            
            if (key in datesAndCommits):
                datesAndCommits[key] += 1
            else:
                datesAndCommits[key] = 1

dates = datesAndCommits.keys()
commits = datesAndCommits.values()

processHistory(commitHistory)

# print(commitHistory[2])
# print(datesAndCommits)

print("Found ", len(datesAndCommits), "objects")

fig, ax = plt.subplots(figsize=(13, 6.9))

ax.grid(True, 'both', alpha=0.8, color='#270082')
ax.bar(dates, commits, color='#FA58B6')
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.yaxis.set_minor_locator(ticker.IndexLocator(1, 0))

ax.tick_params(axis='y', which='minor', grid_alpha=0.4)
ax.set_xlabel('Month')
ax.set_ylabel('# of Commits')
ax.set_title('EDGE Commit History', color='#7A0BC0', fontweight='bold')

# colors

fig.patch.set_facecolor('#000')
ax.set_facecolor('#07071a')
ax.xaxis.label.set_color('#6608a1')
ax.yaxis.label.set_color('#6608a1')
ax.tick_params(axis='both', colors='#6608a1')
ax.spines['left'].set_color('#7A0BC0')
ax.spines['bottom'].set_color('#7A0BC0')
ax.spines['right'].set_color('#7A0BC0')
ax.spines['top'].set_color('#7A0BC0')
# ax.spines['right'].set_visible(False)
# ax.spines['top'].set_visible(False)

for label in ax.get_xticklabels():
    label.set(rotation=30, horizontalalignment='right')

# plt.figure(figsize=(11, 6.5))
# ax = pd.Series(commits).plot(kind='bar')
# ax.set_title("A")
# ax.set_xlabel("X")
# ax.set_ylabel("Y")
# ax.set_xticklabels(dates)

hMargin = 0.06
plt.subplots_adjust(left=hMargin, bottom=0.12, top=0.91, right=1.0 - hMargin)
plt.show()