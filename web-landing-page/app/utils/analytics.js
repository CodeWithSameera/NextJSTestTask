export const logEvent = async (eventType, eventData) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          ...eventData,
          timestamp: new Date().toISOString(),
        }),
      });
      console.log(`${eventType} event logged`);
    } catch (error) {
      console.error(`Failed to log ${eventType} event:`, error);
    }
  };
  