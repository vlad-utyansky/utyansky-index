// [IDX: 00000-75000-00004] Аппаратный Ликвидатор Зомби-Процессов и Разблокировщик Диска (Zombie Killer & NTFS Liberator)
// Архитектурный Стандарт Индекса Утянского v2.6.7
// 1) Уничтожает зависшие зомби-процессы Node/Vite на портах 5173, 3001, 3005
// 2) Снимает атрибуты Read-Only и выдаёт полный доступ 777 (icacls)

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

console.log('\n🧹 [ZOMBIE KILLER & NTFS LIBERATOR v2.6.7] Запуск цикла аппаратной очистки...');

// 1. АППАРАТНАЯ ЛИКВИДАЦИЯ ЗОМБИ-ПРОЦЕССОВ НА ПОРТАХ
const targetPorts = [5173, 3001, 3005];
let killedCount = 0;

targetPorts.forEach(port => {
  try {
    const isWin = os.platform() === 'win32';
    if (isWin) {
      const netstat = execSync(`netstat -ano | findstr :${port}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString();
      const lines = netstat.trim().split('\n');
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(pid) && pid !== '0' && pid !== String(process.pid)) {
          try {
            console.log(`   ⚡ [KILL] Обнаружен зомби-процесс на порту :${port} (PID: ${pid}). Ликвидация...`);
            execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
            killedCount++;
          } catch (e) {}
        }
      });
    }
  } catch (e) {
    // Порт свободен
  }
});

if (killedCount === 0) {
  console.log('   ✅ Все порты (5173, 3001, 3005) чисты: зомби-процессы отсутствуют.');
} else {
  console.log(`   🎯 Ликвидировано зомби-процессов: ${killedCount}. Порты разблокированы.`);
}

// 2. ЦИКЛ РАЗБЛОКИРОВКИ ДИСКА NTFS 666 / 777 (UNLOCK PERMISSIONS)
const targetPath = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');

if (os.platform() === 'win32') {
  console.log(`\n🔓 [NTFS 777 UNLOCK] Снятие файловых замков и выдача полных прав: ${targetPath}`);
  try {
    // Снятие атрибута «Только чтение» (Read-Only)
    execSync(`attrib -r -s -h "${targetPath}\\*.*" /s /d`, { stdio: 'ignore' });
    console.log('   ✅ Атрибуты Read-Only сняты (attrib -r -s -h).');
  } catch (e) {
    console.warn('   ⚠️ Предупреждение attrib:', e.message);
  }

  try {
    // Выдача полного доступа Все / Everyone (*S-1-1-0)
    execSync(`cmd.exe /c "icacls \\"${targetPath}\\" /grant *S-1-1-0:(OI)(CI)F /T /C /Q"`, { stdio: 'ignore' });
    console.log('   ✅ Права 777 Full Control выданы через icacls (*S-1-1-0).');
  } catch (e) {
    console.warn('   ⚠️ Предупреждение icacls:', e.message);
  }
}

console.log('\n💎 [СТАНДАРТ v2.6.7] СИСТЕМА ПОЛНОСТЬЮ РАЗБЛОКИРОВАНА И ГОТОВА К РАБОТЕ.\n');
