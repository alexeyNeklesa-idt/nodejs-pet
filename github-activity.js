#!/usr/bin/env node
// GitHub Activity CLI
// Usage: node github-activity.js <username>

const https = require('https');

function fetchGitHubActivity() {
    const options = {
        hostname: 'api.github.com',
        path: `/users/alexeyNeklesa-idt/events`,
        method: 'GET',
        headers: {
            'User-Agent': 'github-activity-cli'
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 404) {
                console.error(`Error: User '${username}' not found.`);
                process.exit(1);
            }

            if (res.statusCode !== 200) {
                console.error(`Error: GitHub API returned status code ${res.statusCode}`);
                process.exit(1);
            }

            try {
                const events = JSON.parse(data);
                displayActivity(events, username);
            } catch (error) {
                console.error('Error: Failed to parse GitHub API response.');
                process.exit(1);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error: Failed to fetch data from GitHub API.');
        console.error(error.message);
        process.exit(1);
    });

    req.end();
}

function displayActivity(events, username) {
    if (!events || events.length === 0) {
        console.log(`No recent activity found for user '${username}'.`);
        return;
    }

    console.log(`Recent activity for ${username}:\n`);

    events.forEach((event) => {
        let output = '';

        switch (event.type) {
            case 'PushEvent':
                const commitCount = event.payload.commits?.length || 0;
                output = `- Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${event.repo.name}`;
                break;

            case 'IssuesEvent':
                const action = event.payload.action;
                output = `- ${action.charAt(0).toUpperCase() + action.slice(1)} an issue in ${event.repo.name}`;
                break;

            case 'WatchEvent':
                output = `- Starred ${event.repo.name}`;
                break;

            case 'ForkEvent':
                output = `- Forked ${event.repo.name}`;
                break;

            case 'CreateEvent':
                const refType = event.payload.ref_type;
                output = `- Created ${refType} in ${event.repo.name}`;
                break;

            case 'DeleteEvent':
                const deletedRefType = event.payload.ref_type;
                output = `- Deleted ${deletedRefType} in ${event.repo.name}`;
                break;

            case 'PullRequestEvent':
                const prAction = event.payload.action;
                output = `- ${prAction.charAt(0).toUpperCase() + prAction.slice(1)} a pull request in ${event.repo.name}`;
                break;

            case 'PullRequestReviewEvent':
                output = `- Reviewed a pull request in ${event.repo.name}`;
                break;

            case 'PullRequestReviewCommentEvent':
                output = `- Commented on a pull request in ${event.repo.name}`;
                break;

            case 'IssueCommentEvent':
                output = `- Commented on an issue in ${event.repo.name}`;
                break;

            case 'MemberEvent':
                output = `- Added a collaborator to ${event.repo.name}`;
                break;

            case 'PublicEvent':
                output = `- Made ${event.repo.name} public`;
                break;

            case 'ReleaseEvent':
                output = `- Published a release in ${event.repo.name}`;
                break;

            default:
                output = `- ${event.type.replace('Event', '')} in ${event.repo.name}`;
                break;
        }

        if (output) {
            console.log(output);
        }
    });
}

// Parse command line arguments
const username = process.argv[2];
fetchGitHubActivity(username);
