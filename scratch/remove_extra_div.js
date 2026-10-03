const fs = require('fs');

let content = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');

// Target the closing divs around line 5255-5270
const target = `            </div> <!-- Closes .sidebar-booking-card -->
          </div> <!-- Closes right column wrapper -->

        </div> <!-- Closes .container.trek-detail-layout -->
      </div>
    </section>`;

const replacement = `            </div> <!-- Closes .sidebar-booking-card -->
          </div> <!-- Closes right column wrapper -->
        </div> <!-- Closes .container.trek-detail-layout -->
      </section>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('trek/upper-mustang-trek/index.html', content, 'utf8');
  console.log('✓ Successfully removed extra div');
} else {
  console.error('✗ target not found');
}
