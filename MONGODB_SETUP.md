# 🔧 MongoDB Atlas Connection Fix

## Problem
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Whitelist Your IP Address

### Step 1: Get Your Current IP Address

**Option A: Using Terminal**
```bash
curl ifconfig.me
```

**Option B: Using Browser**
- Visit: https://whatismyipaddress.com/
- Copy your IPv4 address

### Step 2: Add IP to MongoDB Atlas Whitelist

1. **Log in to MongoDB Atlas**
   - Go to: https://cloud.mongodb.com/
   - Sign in with your account

2. **Navigate to Network Access**
   - Click on your cluster name
   - Go to **"Network Access"** in the left sidebar
   - Or go directly: https://cloud.mongodb.com/v2#/security/network/list

3. **Add IP Address**
   - Click **"Add IP Address"** button
   - Choose one of these options:

   **For Development (Recommended):**
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (allows all IPs)
   - ⚠️ **Note**: Only use this for development, not production!

   **For Production (More Secure):**
   - Click **"Add Current IP Address"** (if available)
   - Or manually enter your IP address
   - Click **"Confirm"**

4. **Wait for Changes**
   - It may take 1-2 minutes for changes to propagate
   - The status should show "Active"

### Step 3: Verify Connection String

Make sure your `.env` file has the correct connection string:

```env
MONGODB_URI=mongodb+srv://muchewadarpita123_db_user:9ZvQiZnfqs9b9kmS@cluster0.tpgdpwo.mongodb.net/reimbursement_db?retryWrites=true&w=majority
```

### Step 4: Test Connection

After whitelisting your IP, restart your backend server:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3001
```

## Alternative: Check MongoDB Atlas Dashboard

1. Go to your MongoDB Atlas cluster
2. Click **"Connect"** button
3. Choose **"Connect your application"**
4. Copy the connection string
5. Make sure it matches your `.env` file

## Troubleshooting

### Still Can't Connect?

1. **Check Database User**
   - Go to **"Database Access"** in MongoDB Atlas
   - Verify the username and password are correct
   - Make sure the user has read/write permissions

2. **Check Cluster Status**
   - Make sure your cluster is running (not paused)
   - Free tier clusters pause after inactivity

3. **Verify Connection String Format**
   - Should start with `mongodb+srv://`
   - Should include database name: `/reimbursement_db`
   - Should include connection options: `?retryWrites=true&w=majority`

4. **Try Different Network**
   - If on VPN, try disconnecting
   - If on corporate network, IP might be blocked

5. **Check Firewall**
   - Make sure your firewall isn't blocking MongoDB connections
   - MongoDB uses port 27017 (but `mongodb+srv://` handles this automatically)

## Quick Fix for Development

For quick development setup, you can allow all IPs:

1. Go to **Network Access** in MongoDB Atlas
2. Click **"Add IP Address"**
3. Enter `0.0.0.0/0` (allows all IPs)
4. Add comment: "Development - Allow all"
5. Click **"Confirm"**

⚠️ **Security Note**: Only use `0.0.0.0/0` for development. For production, always whitelist specific IPs.

## Still Having Issues?

If you continue to have problems:
1. Double-check your MongoDB Atlas username and password
2. Verify the cluster is not paused
3. Check MongoDB Atlas status page for outages
4. Try creating a new database user with read/write permissions

