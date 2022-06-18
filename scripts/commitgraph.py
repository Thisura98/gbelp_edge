# This is a Python3 script to visualize my commit history.

import subprocess
import re
from datetime import datetime
import pandas as pd
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
import matplotlib.pyplot as plt

pathToCommitHistoryScript = './write_commit_history.sh'
pathToCommitHistoryOutput = '../thinking/CommitHistory/history.log'

subprocess.call(['sh', pathToCommitHistoryScript])
commitHistory = open(pathToCommitHistoryOutput, 'r').readlines()

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

            # key = result.groups()[0]

            # key = dateObj.timestamp()
            # print(key)

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
ax.bar(dates, commits)
ax.grid(True, 'both', alpha=0.5)
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.yaxis.set_minor_locator(ticker.IndexLocator(1, 0))

ax.tick_params(axis='y', which='minor', grid_alpha=0.1)
ax.set_xlabel('Month')
ax.set_ylabel('# of Commits')
ax.set_title('EDGE Commit History')

for label in ax.get_xticklabels():
    label.set(rotation=30, horizontalalignment='right')

# plt.figure(figsize=(11, 6.5))
# ax = pd.Series(commits).plot(kind='bar')
# ax.set_title("A")
# ax.set_xlabel("X")
# ax.set_ylabel("Y")
# ax.set_xticklabels(dates)

plt.show()