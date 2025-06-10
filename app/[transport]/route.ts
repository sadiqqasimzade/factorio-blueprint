import BlueprintDecoder from '@/utils/convertors/blueprintDecoder';
import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
 
const handler = createMcpHandler((server) => {
  server.tool(
    'factorioBlueprintDecoder',
    {
      input: z.string(),
      description: 'Decode a factorio blueprint'
    },
    async (args) => {
      return { 
        content:[{
            text: String(BlueprintDecoder(args.input)),
            type:"text"
        }]
       };
    },
  );
},{
    capabilities:{
        tools:{
            factorioBlueprintDecoder:{
                input:z.string(),
                description:"Decode a factorio blueprint"
            }
        }
    }
},{
    redisUrl:process.env.REDIS_URL,
    streamableHttpEndpoint:"/mcp",
    verboseLogs:true,
    maxDuration:60
});
 
export { handler as DELETE, handler as GET, handler as POST };

