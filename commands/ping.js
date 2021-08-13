module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    async execute(message){
        await message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms`);
    }
}
