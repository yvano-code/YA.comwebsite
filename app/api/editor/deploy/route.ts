import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Stage the content.json file
    await execAsync('git add data/content.json')
    
    // Check if there are changes to commit
    try {
      await execAsync('git commit -m "Content update via visual editor"')
    } catch (commitErr: any) {
      // If there's nothing to commit, it will throw an error. We can ignore it if it's just "nothing to commit".
      if (!commitErr.stdout?.includes('nothing to commit')) {
        throw commitErr
      }
    }

    // Push to current branch (which should trigger Vercel if connected to Github)
    await execAsync('git push')
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deploying content:', error)
    return NextResponse.json({ error: error.message || 'Failed to deploy' }, { status: 500 })
  }
}
