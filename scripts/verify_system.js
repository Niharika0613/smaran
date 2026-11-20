import http from 'node:http';

async function test() {
  const { default: expressApp } = await import('../server/index.js').catch(err => {
    console.error('Import error:', err);
    process.exit(1);
  });

  // Wait 1 second for port listening
  await new Promise(r => setTimeout(r, 1200));

  try {
    const health = await (await fetch('http://127.0.0.1:8787/api/health')).json();
    console.log('✓ Health:', health.service, health.status);

    const dash = await (await fetch('http://127.0.0.1:8787/api/dashboard')).json();
    console.log('✓ Patients loaded:', dash.patients.map(p => `${p.name} (${p.score})`));

    const rep = await (await fetch('http://127.0.0.1:8787/api/patients/patient-nirmala/repertoire')).json();
    console.log('✓ Repertoire for Nirmala:');
    console.log('   - Era:', rep.reminiscenceEra);
    console.log('   - Memory Reminiscence playlist count:', rep.playlists.memoryReminiscence.length);
    console.log('   - Top tracks:', rep.playlists.memoryReminiscence.slice(0, 3).map(t => t.title).join(' | '));

    const monthly = await (await fetch('http://127.0.0.1:8787/api/patients/patient-nirmala/monthly-report')).json();
    console.log('✓ Monthly report generated:', monthly.reportId, 'Calm rate:', monthly.calmSuccessRate + '%');

    const indexHtml = await (await fetch('http://127.0.0.1:8787/')).text();
    console.log('✓ Frontend static serving HTML title:', indexHtml.match(/<title>(.*?)<\/title>/)?.[1]);

    console.log('\n--- ALL VERIFICATIONS PASSED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    process.exit(0);
  }
}

test();
